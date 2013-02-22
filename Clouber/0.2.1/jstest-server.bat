
rem java -jar src\test\lib\jsTestDriver\JsTestDriver-1.3.4.b.jar  --port 4224 --browser "D:\Users\Jon\AppData\Local\Google\Chrome\Application\chrome.exe"


rem java -jar src\test\lib\jsTestDriver\JsTestDriver-1.3.4.b.jar  --port 4224 --browser "C:\Program Files\Internet Explorer\iexplore.exe"

cls
java -jar src\test\lib\jsTestDriver\JsTestDriver-1.3.4.b.jar --basePath src  --config src\test\lib\jsTestDriver\jsTestDriver.conf --runnerMode DEBUG --port 4224 --browser "C:\Program Files (x86)\Mozilla Firefox\firefox.exe"

