---------- Indexing ---------- 

1. Drop the collection with db.testdb.drop()

2. Indexing a database is like creating an index for a book. This makes it much quicker to look up data. Here I'll create a large set of documents and then analyze execution time. This can take a minute to generate 500,000 documents so wait.

a. for(i= 0; i < 500000; i++){
db.testdb.insert(
{"account":"account"+i,
"age":Math.floor(Math.random() * 90)});}

3. We can see how long this query took 
db.testdb.find({"age": 50}).explain("executionStats")

a. executionTimeMillis tells us how long the search took (155 milliseconds on my machine)

b. totalDocsExamined shows that all 500,000 documents were examined

4. Lets create a compound index based on first age and then account. We start with age because we plan on querying for age. Indexing should be based on improving the performance of a query. 

a. Cardinality defines the number of distinct values a field may have. Sex for example would be either M or F which would be a low cardinality. Email would be different for every user and hence would have a high cardinality. The higher the cardinality the more valuable an index on that field would be, however basing indexes on grouping to improve queries is most important.

b. db.testdb.ensureIndex({"age" : 1, "account" : 1})

c. Now executionTimeMillis is 0

d. totalDocsExamined dropped from 500,000 to 5674

e. This query is quicker because it can search directly for the age 50 and ignore everything else

f. You can see here that the index was used indexName : "age_1_account_1" 

g. Indexes are useful when you are returning a small subset of the data and less so when you are receiving a large percentage.

h. You can see all your indexes with the command
db.testdb.getIndexes()

i. You can delete indexing with the command
db.testdb.dropIndex("age_1_account_1")

5. Indexing something that is unique to each document can be helpful if you use limits which avoids searching further after the limit has been reached. It can also be helpful is you force the item to be unique.

a. db.testdb.find({"account" : "account100"}).explain("executionStats")

	i. executionTimeMillis : 124

b. db.testdb.ensureIndex({"account" : 1}, {"unique" : true})

	i. db.testdb.find({"account" : "account100"}).explain("executionStats")

	ii. executionTimeMillisEstimate" : 0

	iii. If you use db.testdb.ensureIndex({"account" : 1}, {"unique" : true, "dropdups" : true}) duplicate documents will be deleted which may be good or bad?

	iv. At times you may wish to index a field that may have null as a value for many documents. Sparse can be used in those situations
	db.testdb.ensureIndex({"account" : 1}, {"unique" : true, "sparse" : true})

---------- Aggregations ---------- 

1. Can be used to perform operations on multiple documents

2. Drop the collection with db.testdb.drop()

3. db.testdb.insert([{"recipe" : "Chipotle Sofrita", "author" : "Sally Smith", "likes" : 205, "dislikes" : 2, "type" : "latin", "datePosted" : new Date(2014, 12, 27)}, 
{"recipe" : "Black Beans", "author" : "Paul Smith", "likes" : 108, "dislikes" : 4, "type" : "latin", "datePosted" : new Date(2015, 1, 3)},
{"recipe" : "Cilantro Lime Rice", "author" : "Sally Smith", "likes" : 190, "dislikes" : 4, "type" : "latin", "datePosted" : new Date(2015, 1, 12)}, 
{"recipe" : "Tomato Salsa", "author" : "Tim Smith", "likes" : 105, "dislikes" : 5, "type" : "latin", "datePosted" : new Date(2015, 1, 24)}, 
{"recipe" : "Tortillas", "author" : "Sam Smith", "likes" : 208, "dislikes" : 2, "type" : "latin", "datePosted" : new Date(2015, 2, 10)}, 
{"recipe" : "Tomatillo Green Chili", "author" : "Mark Smith", "likes" : 118, "dislikes" : 8, "type" : "latin", "datePosted" : new Date(2015, 2, 12)}, 
{"recipe" : "Barbecue Seitan", "author" : "Paul Smith", "likes" : 178, "dislikes" : 1, "type" : "vegan", "datePosted" : new Date(2015, 2, 16)}, 
{"recipe" : "Vegan Sloppy Joes", "author" : "Sally Smith", "likes" : 123, "dislikes" : 7, "type" : "vegan", "datePosted" : new Date(2015, 2, 21)}, 
{"recipe" : "Sweet Potato Fries", "author" : "Paul Smith", "likes" : 176, "dislikes" : 5, "type" : "vegan", "datePosted" : new Date(2015, 3, 8)}, 
{"recipe" : "Pita Bread", "author" : "Tim Smith", "likes" : 116, "dislikes" : 1, "type" : "arabic", "datePosted" : new Date(2015, 3, 12) }, 
{"recipe" : "Sundried Tomato Hummus", "author" : "Tony Smith", "likes" : 119, "dislikes" : 5, "type" : "arabic", "datePosted" : new Date(2015, 3, 27)}])

4. Group documents by the field author and each time author the same authors name is found increment sum for it and display results 
db.testdb.aggregate([{$group : {_id : "$author", num_recipes : {$sum : 1}}}])

5. We can sort results from highest to lowest
db.testdb.aggregate([{$group : {_id : "$author", num_recipes : {$sum : 1}}}, {$sort : {num_recipes : -1}}])

6. We can get the total number of likes for each author 
db.testdb.aggregate([{$group : {_id : "$author", num_likes : {$sum : "$likes"}}}, {$sort : {num_likes : -1}}])

7. We can get the average number of likes
db.testdb.aggregate([{$group : {_id : "$author", num_likes : {$avg : "$likes"}}}, {$sort : {num_likes : -1}}])

8. Get the minimum number of likes versus all recipes
db.testdb.aggregate([{$group : {_id : "$author", num_likes : {$min : "$likes"}}}, {$sort : {num_likes : -1}}])

9.  Get the maximum number of likes versus all recipes and limit results to the top 3
db.testdb.aggregate([{$group : {_id : "$author", num_likes : {$max : "$likes"}}}, {$sort : {num_likes : -1}}, {$limit : 3}])

10. $match is used to filter out documents that don't match the condition which is to only count latin recipes
db.testdb.aggregate([{$match : {"type" : "latin"}}, {$group : {_id : "$author", num_recipes : {$sum : 1}}}])

11. $project can provide fields from subdocuments and it also allows for renaming fields. Here we get a list of the recipes using the name Recipe instead of recipe and not returning the _id
db.testdb.aggregate({"$project" : {"Recipe" : "$recipe", "_id" : 0}})

12. Add the dislikes with the likes 
db.testdb.aggregate({"$project" : {"Strong Impressions" : {
"$add" : ["$likes", "$dislikes"]}, "_id" : 0}})

13. Subtract the dislikes from the likes
db.testdb.aggregate({"$project" : {"Strong Impressions" : {
"$subtract" : ["$likes", "$dislikes"]}, "_id" : 0}})

14. Multiply
db.testdb.aggregate({"$project" : {"Strong Impressions" : {
"$multiply" : ["$likes", "$dislikes"]}, "_id" : 0}})

15. Divide
db.testdb.aggregate({"$project" : {"Strong Impressions" : {
"$divide" : ["$likes", "$dislikes"]}, "_id" : 0}})

16. You can extract date information like month, year, week, dayOfMonth, dayOfWeek, dayOfYear, hour, minute, second
db.testdb.aggregate({"$project" : {"Month Posted" : {"$month" : "$datePosted"}, "recipe" : 1, "_id" : 0}})

17. There are string operators as well substr, concat, toLower, and toUpper

a. List each recipe type using substring of the type
db.testdb.aggregate({"$project" : {"Type" : {
"$substr" : ["$type", 0, 3]}, "_id" : 0}})

b. Concat strings to make a title and uppercase it
db.testdb.aggregate({
	"$project" : { 
		"Title" : {
			"$concat" : [{ $toUpper : "$recipe" }, " by ", "$author"]
		}
, "_id" : 0}})

18. We can return different output based on conditions
db.testdb.aggregate({
	"$project" : { 
		"Score" : {
			"$cond" : { if : {$gte : ["$likes", 200] }, then : "Great", else : "Ok" }
}, "recipe" : 1, "_id" : 0}})

19. We can compare values
db.testdb.aggregate({
	"$project" : { 
		"Compare to 200" : {
			$cmp : ["$likes", 200]
		}
, "recipe" : 1, "_id" : 0}})