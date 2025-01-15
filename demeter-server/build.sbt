import scala.collection.Seq

// Enable feature warnings to show detailed information about Scala features used in the code
scalacOptions += "-feature"

ThisBuild / version := "demeter-server-1.0.0"
ThisBuild / scalaVersion := "3.3.4"

// Specifies the name of the generated package
name := "demeter-server"
// Specifies the maintainer or developer of the package
maintainer := "Advantest China"
// Specifies the name of the generated package
// It is recommended to define both name and packageName properties in sbt builds and set their values to the same value to avoid possible conflicts
packageName := "demeter"
// Specifies an overview of the generated package
packageSummary := "demeter"
// Set the description information of the generated package
packageDescription := """demeter description"""
// Sets the daemon user used when running sbt tasks on Linux operating systems as "root"
Linux / daemonUser  := "root"
// Set the user group of the daemon process used when running sbt tasks on Linux operating systems to "root"
Linux / daemonGroup  := "root"
// Specifies the resource file directory in the sbt project source code directory
Compile / resourceDirectory  := baseDirectory.value /"src" / "main" / "resources"

/**Linux package*/
// Sets the official download link for the generated RPM package
rpmUrl := Some("https://www.advantest.com")
// Specifies the RPM package group to which the package belongs
rpmGroup := Some("Applications/Productivity")
// Set the vendor information for the generated RPM package
rpmVendor := """Advantest China RD"""
// Sets the release version information for the generated RPM package
rpmRelease := "0.10"
// The license associated with software in the RPM.
rpmLicense := Some("Copyright (C) 2005, ADVANTEST Corporation, China")
// The name of the package for the rpm.
Rpm / packageName := packageName.value
// The version of the package for rpm.
Rpm /version := "v0.10"
// Set schema information for generated RPM packages
Rpm / packageArchitecture := "x86_64"
// A brief, one-line summary of the package.
Rpm / packageSummary := packageSummary.value
// A longer, multi-line description of the package.
Rpm / packageDescription := packageDescription.value
// Set the default installation path for RPM packages
defaultLinuxInstallLocation := "/opt/"
// Settings, operations that need to be performed before and after RPM package installation
Rpm / maintainerScripts := Map(
  RpmConstants.Pre -> Seq("""echo "Start the installation of demeter""""),
  RpmConstants.Posttrans -> Seq("""echo "Install complete""""),
  RpmConstants.Preun -> Seq("""echo "Start uninstalling demeter""""),
  RpmConstants.Postun -> Seq("""rm -rf /opt/demeter""","""echo "Uninstall complete"""")
)


// The Akka dependencies are available from Akka’s library repository.
// To access them there, you need to configure the URL for this repository.
resolvers += "Akka library repository".at("https://repo.akka.io/maven")

enablePlugins(RpmPlugin)
enablePlugins(AkkaGrpcPlugin)
enablePlugins(UniversalPlugin)
enablePlugins(JavaAppPackaging)
enablePlugins(JavaServerAppPackaging)

val MysqlVersion = "8.0.33"
val SlickVersion = "3.5.2"
val AkkaVersion = "2.10.0"
val AkkaHttpVersion = "10.7.0"
val logbackClassicVersion = "1.5.16"
libraryDependencies ++= Seq(
  "com.typesafe.akka" %% "akka-actor" % AkkaVersion,
  "com.typesafe.akka" %% "akka-cluster-tools" % AkkaVersion,
  "com.typesafe.akka" %% "akka-discovery" % AkkaVersion,
  "com.typesafe.akka" %% "akka-distributed-data" % AkkaVersion,
  "com.typesafe.akka" %% "akka-multi-node-testkit" % AkkaVersion % Test,
  "com.typesafe.akka" %% "akka-persistence" % AkkaVersion,
  "com.typesafe.akka" %% "akka-persistence-tck" % AkkaVersion,
  "com.typesafe.akka" %% "akka-persistence-typed" % AkkaVersion,
  "com.typesafe.akka" %% "akka-persistence-query" % AkkaVersion,
  "com.typesafe.akka" %% "akka-protobuf-v3" % AkkaVersion,
  "com.typesafe.akka" %% "akka-remote" % AkkaVersion,
  "com.typesafe.akka" %% "akka-actor-testkit-typed" % AkkaVersion % Test,
  "com.typesafe.akka" %% "akka-slf4j" % AkkaVersion,
  "com.typesafe.akka" %% "akka-stream" % AkkaVersion % Test,
  "com.typesafe.akka" %% "akka-stream-testkit" % AkkaVersion,
  "com.typesafe.akka" %% "akka-stream-typed" % AkkaVersion,
  "com.typesafe.akka" %% "akka-testkit" % AkkaVersion,
  "com.typesafe.akka" %% "akka-actor-typed" % AkkaVersion,
  "com.typesafe.akka" %% "akka-coordination" % AkkaVersion,
  "com.typesafe.akka" %% "akka-cluster" % AkkaVersion,
  "com.typesafe.akka" %% "akka-cluster-typed" % AkkaVersion,
  "com.typesafe.akka" %% "akka-cluster-metrics" % AkkaVersion,
  "com.typesafe.akka" %% "akka-cluster-sharding" % AkkaVersion,
  "com.typesafe.akka" %% "akka-cluster-sharding-typed" % AkkaVersion,
  "com.typesafe.akka" %% "akka-http" % AkkaHttpVersion,
  "com.typesafe.akka" %% "akka-http-jwt" % AkkaHttpVersion,
  "com.typesafe.akka" %% "akka-http-core" % AkkaHttpVersion,
  "com.typesafe.akka" %% "akka-http-jackson" % AkkaHttpVersion,
  "com.typesafe.akka" %% "akka-http-spray-json" % AkkaHttpVersion,
  "com.typesafe.akka" %% "akka-http-testkit" % AkkaHttpVersion % Test,
  "com.typesafe.akka" %% "akka-http-xml" % AkkaHttpVersion,
  "com.typesafe.slick" %% "slick" % SlickVersion,
  "com.typesafe.slick" %% "slick-hikaricp" % SlickVersion,
  "ch.qos.logback" % "logback-classic" % logbackClassicVersion,
  "mysql" % "mysql-connector-java" % MysqlVersion,
)
