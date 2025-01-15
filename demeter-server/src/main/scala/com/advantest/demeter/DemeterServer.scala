package com.advantest.demeter

import akka.actor.typed.ActorSystem
import akka.actor.typed.scaladsl.Behaviors
import com.advantest.demeter.database.DBJdbcProfile.profile.api.*
import com.advantest.demeter.http.HttpRoute
import com.advantest.demeter.http.jwt.JwtSecret
import com.advantest.demeter.http.route.*
import com.typesafe.config.{ConfigFactory, ConfigObject}
import slick.jdbc.JdbcProfile

/**
 * Create on 2024/10/13
 * Author: mengen.dai@outlook.com
 */
type DemeterSystem = ActorSystem[Nothing]

object DemeterServer:
  private final lazy val DEMETER_CONFIG = ConfigFactory.load()
  private final lazy val DEMETER_JWT_SECRETS = DEMETER_CONFIG.getList("akka.http.jwt.secrets")
  private final lazy val DEMETER_JWT_SECRET_CONFIG = DEMETER_JWT_SECRETS.get(0).asInstanceOf[ConfigObject].toConfig
  private final lazy val DEMETER_JWT_ALGORITHM = pdi.jwt.JwtAlgorithm.HS256
  private final lazy val DEMETER_JWT_SECRET = DEMETER_JWT_SECRET_CONFIG.getString("secret")
  private final lazy val DEMETER_JWT_ISSUER = DEMETER_JWT_SECRET_CONFIG.getString("issuer")
  private final lazy val DEMETER_JWT_KEY_ID = DEMETER_JWT_SECRET_CONFIG.getString("key-id")

  given JwtSecret = JwtSecret(DEMETER_JWT_KEY_ID, DEMETER_JWT_ISSUER, DEMETER_JWT_SECRET, DEMETER_JWT_ALGORITHM)

  @main def main(args: String*): Unit =
    val system = ActorSystem(Behaviors.empty, "DEMETER_SYSTEM")
    val environment = args.headOption match
      case Some("prod") =>
        system.log.info("Starting in production mode.")
        "database.prod"
      case _ =>
        system.log.info("Starting in development mode.")
        "database.dev"

    given DemeterSystem = system

    given Database = Database.forConfig(environment)

    HttpRoute.start(HolidayRoute(), EmployeeRoute(), DepartmentRoute(), TeamRoute(), ProjectRoute())

