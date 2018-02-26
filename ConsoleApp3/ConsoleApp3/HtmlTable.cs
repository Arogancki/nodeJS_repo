using ConsoleApp3;
using System;
using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.Runtime.Remoting.Messaging;

namespace ConsoleApplication1
{
    public class HtmlTable
    {
        private List<Header> headers = new List<Header>();
        private List<Body> bodies = new List<Body>();
        private List<Footer> footers = new List<Footer>();
        public HtmlTable(string tableContent)
        {
            HtmlParser.Parsed table = HtmlParser.Parse("table", tableContent);
            string content = table.content;
            try
            {
                while (true)
                {
                    HtmlParser.Parsed header = HtmlParser.Parse("thead", content);
                    headers.Add(new Header(header.content));
                    content = header.offset;
                }
            }
            catch (Exception e) { /* no more headers*/}

            try
            {
                while (true)
                {
                    HtmlParser.Parsed body = HtmlParser.Parse("tbody", content);
                    bodies.Add(new Body(body.content));
                    content = body.offset;
                }
            }
            catch (Exception e)
            { /* no more bodies*/}

            try
            {
                while (true)
                {
                    HtmlParser.Parsed footer = HtmlParser.Parse("tfoot", content);
                    footers.Add(new Footer(footer.content));
                    content = footer.offset;
                }
            }
            catch (Exception e)
            { /* no more bodies*/}
        }
        public string get()
        {
            string result = "<table>";
            foreach (TableElement tr in headers)
            {
                result += tr.get();
            }
            foreach (TableElement tr in bodies)
            {
                result += tr.get();
            }
            foreach (TableElement tr in footers)
            {
                result += tr.get();
            }
            return result + "</table>";
        }
        public string getHTML() {
            return "<!DOCTYPE html> <html> <body>" + this.get() + "</body></html>";
        }

        public class TableElement
        {
            string type;
            List<TableRow> content = new List<TableRow>();
            public string get()
            {
                string result = "<" + type + ">";
                foreach (TableRow tr in content)
                {
                    result += tr.get();
                }
                return result + "</" + type + ">";
            }
            public TableElement(string t, string C)
            {
                this.type = t;
                try
                {
                    while (true)
                    {
                        HtmlParser.Parsed row = HtmlParser.Parse("tr", C);
                        content.Add(new TableRow("tr", row.content));
                        C = row.offset;
                    }
                }
                catch (Exception e) { /* no more rows*/}

            }
            public class TableRow
            {
                string type;
                List<RowElement> content = new List<RowElement>();
                public TableRow(string type, string C)
                {
                    this.type = type;
                    try
                    {
                        while (true)
                        {
                            int tr = C.IndexOf("<tr>");
                            int td = C.IndexOf("<td>");
                            if (tr == -1 && td == -1) // no more rows
                                break;
                            string tag;
                            if (tr < td) // tr is first
                                tag = "tr";
                            else
                                tag = "td";
                            if (tr == -1)
                                tag = "td";
                            if (td == -1)
                                tag = "tr";
                            HtmlParser.Parsed row = HtmlParser.Parse(tag, C);
                            content.Add(new RowElement(tag, row.content));
                            C = row.offset;
                        }
                    }
                    catch (Exception e) { }

                }
                public string get()
                {
                    string result = "<" + type + ">";
                    foreach (RowElement re in content)
                    {
                        result += re.get();
                    }
                    return result + "</" + type + ">";
                }
                class RowElement
                {
                    private string type;
                    private string content;
                    public RowElement(string type, string content)
                    {
                        this.type = type;
                        this.content = content;
                    }
                    public string get()
                    {
                        return "<" + type + ">" + content + "</" + type + ">";
                    }
                }
            }
        }
        public class Header : TableElement
        {
            public Header(string content) : base("thead", content)
            {
            }
        }
        public class Footer : TableElement
        {
            public Footer(string content) : base("tfoot", content)
            {
            }
        }
        public class Body : TableElement
        {
            public Body(string content) : base("tbody", content)
            {
            }
        }
    }
}


