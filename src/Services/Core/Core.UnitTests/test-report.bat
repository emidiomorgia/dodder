@ECHO OFF

SET PackagesFolder=%UserProfile%\.nuget\packages
SET OpenCoverVersion=4.7.922
SET ReportGeneratorVersion=4.4.6
SET ProjectName=Core.UnitTests.csproj

@ECHO ON
"%PackagesFolder%\opencover\%OpenCoverVersion%\tools\OpenCover.Console.exe" -target:"C:/Program Files/dotnet/dotnet.exe" -targetargs:"test \"%ProjectName%\" --configuration Debug --no-build" -filter:"+[*]* -[*.Tests*]* -[*.UnitTest*]* -[*.XUnitTest*]* -[<assembly>.DataModel]* -[<assembly>.UnitTest]* -[<assembly>.Diagrams]*" -filter:-excludebyfile:*\*Designer.cs -mergebyhash -oldStyle -register:user -output:"OpenCoverReport.xml"
@ECHO OFF

DEL /F /Q .\coverage\*.*

@ECHO ON
"%PackagesFolder%\ReportGenerator\%ReportGeneratorVersion%\tools\netcoreapp3.0\reportgenerator.exe" -reports:OpenCoverReport.xml -targetdir:coverage Verbosity: Error
START "" ".\coverage\index.htm"