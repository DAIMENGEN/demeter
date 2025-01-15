package com.advantest.demeter.http

import akka.http.scaladsl.Http
import akka.http.scaladsl.server.Directives.{concat, cors}
import akka.http.scaladsl.server.Route
import com.advantest.demeter.DemeterSystem
import com.advantest.demeter.dispatchers.ComputeIntensiveTaskDispatcher

import scala.concurrent.ExecutionContext
import scala.util.{Failure, Success}

/**
 * Create on 2024/10/13
 * Author: mengen.dai@outlook.com
 */
trait HttpRoute:
  protected given executionContext: ExecutionContext = ComputeIntensiveTaskDispatcher(system)

  protected val system: DemeterSystem

  def route: Route

object HttpRoute:
  def start(IP: String, PORT: Int, routes: HttpRoute*)(using system: DemeterSystem): Unit =
    given executionContext: ExecutionContext = ComputeIntensiveTaskDispatcher(system)

    // Start the HTTP server and bind it to the specified address and port.
    val binding = Http().newServerAt(IP, PORT).bind(cors():
      concat(routes.map(_.route): _*)
    )
    // Handle the result of server binding.
    binding onComplete :
      case Failure(e) =>
        // If server start fails, print an error message and terminate the system.
        system.log.info(s"Server start failed due to: ${e.getMessage}. Cause: ${Option(e.getCause).map(_.getMessage).getOrElse("Unknown cause")}")
        system.terminate()
      case Success(_) =>
        // If server starts successfully, print a success message with the server URL.
        system.log.info(s"Server started successfully at $IP:$PORT")

  def start(routes: HttpRoute*)(using system: DemeterSystem): Unit = start("0.0.0.0", 9090, routes: _*)
