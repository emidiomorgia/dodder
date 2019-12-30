
cmd /c "cd ..\src\Web\Client && npm install" && (
cmd /c "npm install -g @angular/cli" && (
cmd /c "cd ..\src\Web\Client && ng test --watch=false" && (
cmd /c "cd ..\src\Web\Client && ng build --prod=true" && (
cmd /c "cd ..\src\Web\Server && dotnet restore" && (
cmd /c "cd ..\src\Web\Server\wwwroot && del *.* /F /Q" && (
cmd /c "cd ..\src\Web\Client\dist\Client && copy *.* ..\..\..\Server\wwwroot" && (
cmd /c "cd ..\src\Web\Server && dotnet build"&& (
cmd /c "cd ..\src\Web\Server && dotnet publish -c Release -o out" && (
cmd /c "cd %windir%\system32\inetsrv && appcmd stop apppool /apppool.name:dodder-web" && (
cmd /c "cd ..\src\Web\Server\out && xcopy *.* c:\inetpub\dodder-web /E /Y"&& (
cmd /c "cd %windir%\system32\inetsrv && appcmd start apppool /apppool.name:dodder-web" )))))))))))

cmd /c "cd ..\src\ApiGateways\Web && dotnet restore" && (
cmd /c "cd ..\src\ApiGateways\Web && dotnet build"&& (
cmd /c "cd ..\src\ApiGateways\Web && dotnet publish -c Release -o out" && (
cmd /c "cd %windir%\system32\inetsrv && appcmd stop apppool /apppool.name:dodder-api" && (
cmd /c "cd ..\src\ApiGateways\Web\out && xcopy *.* c:\inetpub\dodder-api /E /Y"&& (
cmd /c "cd %windir%\system32\inetsrv && appcmd start apppool /apppool.name:dodder-api" )))))

cmd /c "cd ..\src\Services\Core\Core.API && dotnet restore" && (
cmd /c "cd ..\src\Services\Core\Core.API && dotnet build"&& (
cmd /c "cd ..\src\Services\Core\Core.API && dotnet publish -c Release -o out" && (
cmd /c "cd %windir%\system32\inetsrv && appcmd stop apppool /apppool.name:dodder-core" && (
cmd /c "cd ..\src\Services\Core\Core.API\out && xcopy *.* c:\inetpub\dodder-core /E /Y"&& (
cmd /c "cd %windir%\system32\inetsrv && appcmd start apppool /apppool.name:dodder-core" )))))