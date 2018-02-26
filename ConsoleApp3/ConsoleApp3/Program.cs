using ConsoleApplication1;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp3
{
    class Program
    {
        static void Main(string[] args)
        {
            string file = File.ReadAllText(@"./TextFile1.txt");
            HtmlTable t = new HtmlTable(file);
            string x = t.get();
            Console.ReadKey();
        }
    }
}
