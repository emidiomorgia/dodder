SET repo_folder=dotnetcore-ddd-angular-microservices\
SET apppool=dodder-web

cmd /c "npm install -g rimraf" 
cmd /c "rimraf dotnetcore-ddd-angular-microservices" 
cmd /c "git clone https://github.com/emidiomorgia/dotnetcore-ddd-angular-microservices.git" 
cmd /c "cd %repo_folder%src\Web\Client && npm install" 
cmd /c "npm install -g @angular/cli" 
cmd /c "cd %repo_folder%src\Web\Client && ng test --watch=false" 
cmd /c "cd %repo_folder%src\Web\Client && ng build --prod=true" 
cmd /c "cd %repo_folder%src\Web\Server && dotnet restore" 
cmd /c "cd %repo_folder%src\Web\Server\wwwroot && del *.* /F /Q" 
cmd /c "cd %repo_folder%src\Web\Client\dist\Client && copy *.* ..\..\..\Server\wwwroot" 
cmd /c "cd %repo_folder%src\Web\Server && dotnet build"
cmd /c "cd %repo_folder%src\Web\Server && dotnet publish -c Release -o out" 
cmd /c "cd C:\Windows\system32\inetsrv && appcmd stop apppool /apppool.name:%apppool%" 
cmd /c "cd %repo_folder%src\Web\Server\out && xcopy *.* c:\inetpub\%apppool% /E /Y"
cmd /c "cd %windir%\system32\inetsrv && appcmd start apppool /apppool.name:%apppool%" 
cmd /c "rimraf dotnetcore-ddd-angular-microservices"