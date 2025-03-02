package com.advantest.demeter.http

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import akka.http.scaladsl.server.Directives.{complete, onComplete}
import akka.http.scaladsl.server.{RequestContext, RouteResult}
import com.advantest.demeter.http.jwt.JwtSecret
import com.advantest.demeter.http.payload.EmployeePayload
import pdi.jwt.{Jwt, JwtClaim}
import spray.json.{JsonFormat, enrichAny}

import scala.concurrent.Future
import scala.util.{Failure, Success}

/**
 * Create on 2024/10/13
 * Author: mengen.dai@outlook.com
 *
 * This trait provides utility methods for handling asynchronous responses in a Spray (Akka HTTP) application
 * and generating authentication token.
 */
trait ApiResponse extends SprayJsonSupport:
  protected val jwtSecret: JwtSecret
  /**
   * A utility function to handle asynchronous responses in a Spray (Akka HTTP) route.
   *
   * This method takes a `Future` representing an asynchronous operation and returns a function that can be used
   * in a route to handle the completion of the `Future`. It completes the request with a success or failure response
   * based on the outcome of the `Future`.
   *
   * @param future A `Future[T]` representing the asynchronous operation.
   * @tparam T The type of the expected result.
   * @return A function that takes a `RequestContext` and returns a `Future[RouteResult]`.
   */
  def response[T: JsonFormat](future: => Future[T]): RequestContext => Future[RouteResult] =
    onComplete(future):
      case Success(value) => complete(ApiResponseModel.success(value))
      case Failure(exception) => complete(ApiResponseModel.failure(exception.getMessage))

  /**
   * Generates an authentication token for an employee.
   *
   * This method generates a JWT token based on the employee information. The token is valid for a certain period of time
   * and is used for employee authentication. The token includes the employee's information, an expiration time, an issuer,
   * and a unique identifier.
   *
   * @param employee The employee entity containing relevant employee information.
   * @return A string representing the generated JWT token.
   */
  def generateToken(employee: EmployeePayload): String =
    // Create a JWT claim with an expiration time and employee information
    val claim = JwtClaim(
      expiration = Some(System.currentTimeMillis() + 3600000),
      content = employee.toJson.compactPrint,
      issuer = Some(jwtSecret.issuer),
      jwtId = Some(jwtSecret.keyId)
    )
    // Encode the claim using HS256 algorithm and a secret key to generate the token
    Jwt.encode(claim, jwtSecret.secret, jwtSecret.algorithm)
