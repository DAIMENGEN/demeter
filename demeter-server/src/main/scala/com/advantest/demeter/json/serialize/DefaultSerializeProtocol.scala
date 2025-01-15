package com.advantest.demeter.json.serialize

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import com.advantest.demeter.utils.DateUtils
import spray.json.{JsNumber, JsString, JsValue, JsonFormat}

import java.time.{LocalDate, LocalDateTime}

/**
 * Create on 2024/10/13
 * Author: mengen.dai@outlook.com
 *
 * A trait that extends SprayJsonSupport to define default serialization protocols for date and date-time types.
 * It provides implicit JSON formats for `LocalDate` and `LocalDateTime` to enable their serialization and deserialization.
 */
trait DefaultSerializeProtocol extends SprayJsonSupport:
  /**
   * Implicit JSON format for `Long`.
   * Provides methods to serialize and deserialize `Long` values to and from JSON strings.
   */
  given LongJsonFormat: JsonFormat[Long] with
    override def write(obj: Long): JsValue = JsString(obj.toString)

    override def read(json: JsValue): Long = json match
      case JsString(value) => value.toLong
      case JsNumber(value) => value.toLong
      case _ => throw new IllegalArgumentException(s"Expected a string as a Long, but received ${json.getClass.getSimpleName}.")

  /**
   * Implicit JSON format for `LocalDate`.
   * Provides methods to serialize and deserialize `LocalDate` objects to and from JSON strings.
   */
  given LocalDateJsonFormat: JsonFormat[LocalDate] with
    override def write(obj: LocalDate): JsValue = JsString(DateUtils.formatLocalDate(obj))

    override def read(json: JsValue): LocalDate = json match
      case JsString(value) => DateUtils.parseLocalDate(value)
      case _ => throw new IllegalArgumentException(s"Expected a string as a LocalDate, but received ${json.getClass.getSimpleName}.")

  /**
   * Implicit JSON format for `LocalDateTime`.
   * Provides methods to serialize and deserialize `LocalDateTime` objects to and from JSON strings.
   */
  given LocalDateTimeJsonFormat: JsonFormat[LocalDateTime] with
    override def write(obj: LocalDateTime): JsValue = JsString(DateUtils.formatLocalDateTime(obj))

    override def read(json: JsValue): LocalDateTime = json match
      case JsString(value) => DateUtils.parseLocalDateTime(value)
      case _ => throw new IllegalArgumentException(s"Serialization Failure: Expected a string as a LocalDateTime, but received ${json.getClass.getSimpleName}.")

