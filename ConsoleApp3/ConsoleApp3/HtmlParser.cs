using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp3
{
    public class HtmlParser
    {
        public static Parsed Parse(string tag, string doc) {

            int tagOffset = tag.Length;
            int start = doc.IndexOf("<"+tag+">");
            if (start < 0)
                throw new Exception("Invalid HTML table!");
            start += (tagOffset + 2);
            doc = doc.Substring(start);
            int end = doc.IndexOf("</" + tag + ">");
            if (end < 0)
                throw new Exception("Invalid HTML table!");



            string c = doc.Substring(0, end);
            string o = doc.Substring(end + tagOffset + 3);
            return new Parsed(c, o);
        }
            public class Parsed{
            public string content = "";
            public string offset = "";
            public Parsed(string c, string o) {
                this.content = c;
                this.offset = o;
            }
        }
    }
}
