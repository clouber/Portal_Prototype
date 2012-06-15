@ECHO OFF

REM ##########################################################################

REM The location of your yuidoc install
SET PATH=\opt\Python27;%PATH%

SET yuidoc_home="\opt\yuidoc"

REM The location of the files to parse.  Parses subdirectories, but will fail if
REM there are duplicate file names in these directories.  You can specify multiple
REM source trees:
REM      SET parser_in="c:\home\www\yahoo.dev\src\js c:\home\www\Event.dev\src"
SET parser_in="\dev\asp\helpdesk\src\sys\0.1.1\core"

REM The location to output the parser data.  This output is a file containing a 
REM json string, and copies of the parsed files.
SET parser_out="\dev\asp\helpdesk\build"

REM The directory to put the html file outputted by the generator
SET generator_out="\dev\asp\helpdesk\docs"

REM The location of the template files.  Any subdirectories here will be copied
REM verbatim to the destination directory.
SET template="%yuidoc_home%\template"

REM The project version that will be displayed in the documentation.
SET version="0.1.1"

SET projecturl="/"

SET projectname="Help Desk"

REM The version of YUI the project uses.
SET yuiversion="2"

python %yuidoc_home%\bin\yuidoc.py %parser_in% -p %parser_out% -o %generator_out% -t %template% -m %projectname% -u %projecturl% -v %version% -Y %yuiversion%

