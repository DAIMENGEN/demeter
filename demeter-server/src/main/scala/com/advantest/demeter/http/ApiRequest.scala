package com.advantest.demeter.http

import akka.http.scaladsl.server.Directives.{extractRequest, provide, reject}
import akka.http.scaladsl.server.{AuthorizationFailedRejection, Directive1}
import com.advantest.demeter.http.jwt.JwtSecret
import com.advantest.demeter.http.payload.EmployeePayload
import com.advantest.demeter.json.serialize.format.reader.JsonReaderFormat
import pdi.jwt.Jwt
import spray.json.*

import scala.language.implicitConversions
import scala.util.{Failure, Success}

/**
 * Create on 2024/10/25
 * Author: mengen.dai@outlook.com
 *
 * This trait representing an API request with methods to handle HTTP request parameters.
 */
trait ApiRequest:
  protected val jwtSecret: JwtSecret
  // Type alias for HTTP request parameters, represented as a map of string keys to JsValue values.
  protected type HttpRequestParams = Map[String, JsValue]

  /**
   * Given instance for decoding JWT and providing employee payload from the token
   */
  given Conversion[String, EmployeePayload] = (token: String) =>
    // Decode the JWT token and verify its validity
    Jwt.decode(token, jwtSecret.secret, Seq(jwtSecret.algorithm)) match
      case Failure(_) => throw new RuntimeException("Invalid token")
      case Success(value) => value.content.parseJson.convertTo[EmployeePayload]

  /**
   * Validates the authenticity of an authentication token and returns the employee information.
   *
   * This method decodes the JWT token, verifies its validity, and extracts the employee information from the token. If the token is invalid or expired, it returns None.
   *
   * @return An Option containing the employee information if the token is valid; otherwise, None.
   */
  def validateToken: Directive1[EmployeePayload] =
    extractRequest.flatMap: request =>
      request.header("Authorization") match
        case Some(authHeader) =>
          val token = authHeader.value().stripPrefix("Bearer ")
          try
            provide(token)
          catch
            case _: RuntimeException => reject(AuthorizationFailedRejection)
        case None => reject(AuthorizationFailedRejection)

  /**
   * Extension methods for `HttpRequestParams` to provide convenient JSON value extraction.
   *
   * This extension adds methods to read various types (`Int`, `Long`, `String`, `Boolean`, etc.)
   * from an HTTP request parameter map.
   */
  extension (params: HttpRequestParams)
    /**
     * Get a `JsonReaderFormat` instance to parse JSON values from the request parameters.
     *
     * @return
     */
    private def reader: JsonReaderFormat = JsonReaderFormat(params)

    /**
     * Reads a value of type `T` from the request parameters using the specified key.
     *
     * @param key the key to look up in the request parameters
     * @tparam T the type of the value to read
     * @return the value of type `T`
     */
    def read[T: JsonFormat](key: String): T = reader.read[T](key)

    /**
     * Reads an `Int` value from the request parameters using the specified key.
     *
     * @param key the key to look up in the request parameters
     * @return the `Int` value
     */
    def readInt(key: String): Int = reader.readInt(key)

    /**
     * Reads an optional `Int` value from the request parameters using the specified key.
     *
     * @param key the key to look up in the request parameters
     * @return an `Option[Int]` containing the value if present, or `None` if not
     */
    def readOptionInt(key: String): Option[Int] = reader.readOptionInt(key)

    /**
     * Reads a `Long` value from the request parameters using the specified key.
     *
     * @param key the key to look up in the request parameters
     * @return the `Long` value
     */
    def readLong(key: String): Long = reader.readLong(key)

    /**
     * Reads a sequence of `Long` values from the request parameters using the specified key.
     *
     * @param key the key to look up in the request parameters
     * @return a sequence of `Long` values
     */
    def readLongArray(key: String): Seq[Long] = reader.readLongArray(key)

    /**
     * Reads an optional `Long` value from the request parameters using the specified key.
     *
     * @param key the key to look up in the request parameters
     * @return an `Option[Long]` containing the value if present, or `None` if not
     */
    def readOptionLong(key: String): Option[Long] = reader.readOptionLong(key)

    /**
     * Reads a `String` value from the request parameters using the specified key.
     *
     * @param key the key to look up in the request parameters
     * @return the `String` value
     */
    def readString(key: String): String = reader.readString(key)

    /**
     * Reads an optional `String` value from the request parameters using the specified key.
     *
     * @param key the key to look up in the request parameters
     * @return an `Option[String]` containing the value if present, or `None` if not
     */
    def readOptionString(key: String): Option[String] = reader.readOptionString(key)

    /**
     * Reads a `Boolean` value from the request parameters using the specified key.
     *
     * @param key the key to look up in the request parameters
     * @return the `Boolean` value
     */
    def readBoolean(key: String): Boolean = reader.readBoolean(key)

    /**
     * Reads an optional `Boolean` value from the request parameters using the specified key.
     *
     * @param key the key to look up in the request parameters
     * @return an `Option[Boolean]` containing the value if present, or `None` if not
     */
    def readOptionBoolean(key: String): Option[Boolean] = reader.readOptionBoolean(key)

