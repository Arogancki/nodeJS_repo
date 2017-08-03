---------- Inserting, Updating and Deleting Documents ----------

1. We covered inserting like this db.testdb.insert({"name" : "Barry Bonds"})

2. We can also insert arrays of documents
db.testdb.insert([{"name" : "Babe Ruth"}, {"name" : "Hank Aaron"}])

3. Object IDs or _id is a unique key made up of 24 hexadecimal numbers, or 2 digits for each byte

a. The first 4 bytes make up a time stamp

b. The next 3 represent a unique id for the computer that generated the id

c. The next 2 bytes represent a unique id based on the process for the computer

d. The last 3 bytes are incrementing numbers for each generated id

4. Delete a document like this : db.testdb.remove({"name" : "Babe Ruth"})

5. We can receive well formatted results with pretty()
db.testdb.find().pretty()

6. We can update a document like this 
db.testdb.update({"name" : "Hank Aaron"},
{$set:{"name" : "Hank Louis Aaron", "Home Runs" : 755}})

7. You can update multiple documents like this

a. db.testdb.insert([{"name" : "Babe Ruth", "Hall Of Fame" : "Inductee"}, 
{"name" : "Ty Cobb", "Hall Of Fame" : "Inductee"}, 
{"name" : "Walter Johnson", "Hall Of Fame" : "Inductee"}, 
{"name" : "Christy Mathewson", "Hall Of Fame" : "Inductee"},
{"name" : "Honus Wagner", "Hall Of Fame" : "Inductee"}])

b. db.testdb.update({"Hall Of Fame" : "Inductee"},
{$set:{"Hall Of Fame" : "Inducted in 1936"}}, {multi:true})

8. You can also replace a document like this
db.testdb.save({
"Name" : "Hank Louis Aaron",
"Home Runs" : 755,
"Hall Of Fame" : "Inducted in 1988"})

9. We can increment a value in a document like this
db.testdb.update({"name" : "Hank Louis Aaron"},
{"$inc" : {"Home Runs" : 1}})

10. You can decrement like this
db.testdb.update({"name" : "Hank Louis Aaron"},
{"$inc" : {"Home Runs" : -1}})

11. We can multiply values
db.testdb.update({"name" : "Hank Louis Aaron"},
{"$mul" : {"Home Runs" : 1.04}})

12. We can add to an array or create one if it doesn't exist
db.testdb.update({"name" : "Barry Bonds"},
{"$push" : {"Records" :
{"Single Season HRs" : 73,
"HRs Career" : 762,
"Walks" : 232}}})

13. You can push multiple values in one operation
db.testdb.update({"name" : "Barry Bonds"},
{"$push" : {"Batting Average" : {"$each" : [.223, .261, .283, .248, .301]}}})

14. You can set the maximum number of items an array can have with slice
db.testdb.update({"name" : "Barry Bonds"},
{"$push" : {"Best Home Run Years" : {"$each" : [45, 45, 46, 46, 49, 73],
"$slice" : -5}}})

15. addToSet adds a value only if it doesn't already exist
db.testdb.update({"name" : "Barry Bonds"},
{"$addToSet" : {"Best Home Run Years" : 47}})

16. Remove the last item added to an array
db.testdb.update({"name" : "Barry Bonds"},
{"$pop" : {"Best Home Run Years" : 1}})

17. You can also remove the first item
db.testdb.update({"name" : "Barry Bonds"},
{"$pop" : {"Best Home Run Years" : -1}})

18. Pull can remove a specific value
db.testdb.update({"name" : "Barry Bonds"},
{"$pull" : {"Best Home Run Years" : 73}})

---------- Querying the Database ---------- 

1. db.testdb.find() is the most basic query which returns everything

2. You can restrict the results by passing key value pairs
db.testdb.find({"name" : "Ty Cobb"})

3. Drop the collection with db.testdb.drop() and Insert
db.testdb.insert([{"name" : "Dale Cooper", "street" : "123 Main St", "city" : "Yakima", "state" : "WA", "dob" : new Date(1959, 2, 22), "sex" : "M", "gpa" : 3.5, "status" : "student", "tests" : [10, 9, 8], "contact info" : {"email" : "dc@aol.com", "phone" : "792-223-8901"}}, 
{"name" : "Harry Truman", "street" : "202 South St", "city" : "Vancouver", "state" : "WA", "dob" : new Date(1946, 1, 24), "sex" : "M", "gpa" : 3.4, "status" : "student", "tests" : [8, 9, 8], "contact info" : {"email" : "ht@aol.com", "phone" : "792-223-9810"}},
{"name" : "Shelly Johnson", "street" : "9 Pond Rd", "city" : "Sparks", "state" : "NV", "dob" : new Date(1970, 12, 12), "sex" : "F", "gpa" : 2.9, "status" : "dropout", "tests" : [10, 8, 0], "contact info" : {"email" : "sj@aol.com", "phone" : "792-223-6734"}},
{"name" : "Bobby Briggs", "street" : "14 12th St", "city" : "San Diego", "state" : "CA", "dob" : new Date(1967, 5, 24), "sex" : "M", "gpa" : 2.0, "status" : "student", "tests" : [5, 4, 6], "contact info" : {"email" : "bb@aol.com", "phone" : "792-223-6178"}},
{"name" : "Donna Hayward", "street" : "120 16th St", "city" : "Davenport", "state" : "IA", "dob" : new Date(1970, 3, 24), "sex" : "F", "gpa" : 3.7, "status" : "student", "tests" : [10, 8, 8], "contact info" : {"email" : "dh@aol.com", "phone" : "792-223-2001"}},
{"name" : "Audrey Horne", "street" : "342 19th St", "city" : "Detroit", "state" : "MI", "dob" : new Date(1965, 2, 1), "sex" : "F", "gpa" : 3.0, "status" : "student", "tests" : [9, 9, 8], "contact info" : {"email" : "ah@aol.com", "phone" : "792-223-2002"}},
{"name" : "James Hurley", "street" : "2578 Cliff St", "city" : "Queens", "state" : "NY", "dob" : new Date(1967, 1, 2), "sex" : "M", "gpa" : 2.9, "status" : "dropout", "tests" : [8, 9, 0], "contact info" : {"email" : "jh@aol.com", "phone" : "792-223-1890"}},
{"name" : "Lucy Moran", "street" : "178 Dover St", "city" : "Hollywood", "state" : "CA", "dob" : new Date(1954, 11, 27), "sex" : "F", "gpa" : 3.0, "status" : "student", "tests" : [9, 9, 8], "contact info" : {"email" : "lm@aol.com", "phone" : "792-223-9678"}},
{"name" : "Tommy Hill", "street" : "672 High Plains", "city" : "Tucson", "state" : "AZ", "dob" : new Date(1951, 12, 21), "sex" : "M", "gpa" : 3.7, "status" : "student", "tests" : [10, 9, 9], "contact info" : {"email" : "th@aol.com", "phone" : "792-223-1115"}},
{"name" : "Andy Brennan", "street" : "281 4th St", "city" : "Jacksonville", "state" : "NC", "dob" : new Date(1960, 12, 27), "sex" : "M", "gpa" : 2.5, "status" : "student", "tests" : [7, 9, 8], "contact info" : {"email" : "ab@aol.com", "phone" : "792-223-8902"}},
])

4. You can search for multiple key / value pairs by separating them with a comma 
db.testdb.find({"state" : "WA", "sex" : "M"}).pretty()

5. You can limit the results returned by specifying the keys to return
db.testdb.find({"state" : "WA", "sex" : "M"}, {"name" : 1, "dob" : 1})

6. You can force the id to not be returned 
db.testdb.find({"state" : "WA", "sex" : "M"}, {"name" : 1, "dob" : 1, "_id" : 0})

7. We can find people with a GPA in a range between 3.0 and 3.5
$lt = Less Then, $gt = Greater Then, $gte = Greater Then or Equal, 
$lte = Less Then or Equal,
db.testdb.find({"gpa" : {"$gte" : 3.0, "$lte" : 3.5}}, {"name" : 1, "gpa" : 1, "_id" : 0})

8. We can search for people born after Jan 1, 1969
year1969 = new Date("01/01/1969")
db.testdb.find({"dob" : {"$gt" : year1969}}, {"name" : 1, "dob" : 1, "_id" : 0})

9. Return any student that is not a male
db.testdb.find({"sex" : {"$ne" : "M"}, "status" : "student"}, {"name" : 1, "_id" : 0})

10. Find GPAs of 3.4, 3.5, 3.6, or 3.7
db.testdb.find({"gpa" : {"$in" : [3.4, 3.5, 3.6, 3.7]}}, {"name" : 1, "_id" : 0})

11. Find all GPAs except for 3.4 - 3.7 that are active students
db.testdb.find({"gpa" : {"$nin" : [3.4, 3.5, 3.6, 3.7]}, "status" : "student"}, {"name" : 1, "_id" : 0})

12. To do an or check with multiple keys use $or
db.testdb.find({"$or" : [{"status" : "dropout"}, {"gpa" : {"$lt" : 3.0}}]}, {"name" : 1, "_id" : 0})

13. $not can be used to find every gpa not greater then 3.0 
db.testdb.find({"gpa": {$not : {$gt : 3.0}}}, {"name" : 1, "_id" : 0})

a. You can just get the first 3 results with
db.testdb.find({"gpa": {$not : {$gt : 3.0}}}, {"name" : 1, "_id" : 0}).limit(3)

b. You could skip the first 2 with
db.testdb.find({"gpa": {$not : {$gt : 3.0}}}, {"name" : 1, "_id" : 0}).skip(2)

c. You can sort them by name 
db.testdb.find({"gpa": {$not : {$gt : 3.0}}}, {"name" : 1, "_id" : 0}).sort({"name" : 1})

14. We can use a regular expression to search for everyone whose name starts with D
^ Match the beginning of the line
. Followed by * means match any character (.), any number of times (*)
$ Match the end of the line
db.testdb.find({"name" : /^D.*$/}, {"name" : 1, "_id" : 0})

15. We can check for every student that got a 0 on a test
db.testdb.find({"tests" : 0}, {"name" : 1, "_id" : 0})

16. Find students with a 10 and a 0 on tests
db.testdb.find({"tests" : {$all : [0, 10]}}, {"name" : 1, "_id" : 0})

17. Students that got a 10 on the first test (Arrays are 0 Indexed)
db.testdb.find({"tests.0" : 10}, {"name" : 1, "_id" : 0})

18. Find arrays of a certain size

a. First add an extra test to a student array
db.testdb.update({"name" : "Dale Cooper"}, {"$push" : {"tests" : 9}})

b. Check for students that have taken 4 tests
db.testdb.find({"tests" : {"$size" : 4}}, {"name" : 1, "_id" : 0})

19. Get the first 2 tests with $slice
db.testdb.find({"name" : "Dale Cooper"}, {"tests" : {"$slice" : 2}}).pretty()

20. Get the last 2 tests with $slice
db.testdb.find({"name" : "Dale Cooper"}, {"tests" : {"$slice" : -2}}).pretty()

21. Get the 2nd and 3rd tests with $slice by skipping the first and returning the next 2 in line
db.testdb.find({"name" : "Dale Cooper"}, {"tests" : {"$slice" : [1,2]}}).pretty()

22. Get the email for Lucy Moran with the dot operator
db.testdb.find({"name" : "Lucy Moran"}, {"name" : 1, "contact info.email" : 1, "_id" : 0})

23. Search for a match using the dot operator
db.testdb.find({"contact info.phone" : "792-223-1115"}, {"name" : 1, "_id" : 0})