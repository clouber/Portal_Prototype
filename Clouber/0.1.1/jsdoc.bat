
SET BASEDIR="\opt\jstoolkit"
java -Xms256m -jar %BASEDIR%\jsrun.jar %BASEDIR%\app\run.js -a -t=%BASEDIR%\templates\jsdoc -r=10 -x=js -S -d=docs -o=jsdoc.log -E="jsr" src\sys\0.1.1\core src\sys\0.1.1\ui src\sys\0.1.1\portal src\sys\0.1.1\ui src\sys\0.1.1\portlet  %1 %2 %3 %4 %5 %6 %7 %8