package com.advantest.demeter.json.serialize.format.reader.protocol

import com.advantest.demeter.json.serialize.format.reader.JsonReader
import com.advantest.demeter.utils.DateUtils
import spray.json.DefaultJsonProtocol.StringJsonFormat
import spray.json.{JsString, JsValue}

import java.time.LocalDateTime

/**
 * Create on 2024/10/13
 * Author: mengen.dai@outlook.com
 *
 * LocalDateTimeJsonReader: A JsonReader implementation for reading LocalDateTime value from JSON object.
 */
object LocalDateTimeJsonReader extends JsonReader[LocalDateTime]:
  /**
   * Reads a value of type LocalDateTime from the provided JSON object based on the specified key.
   *
   * @param key    The key used to retrieve the value from the JSON object.
   * @param values The JSON object containing the values.
   * @return Either a DemeterException if an error occurs during extraction, or the extracted value of type LocalDateTime.
   */
  override def read(key: String, values: Map[String, JsValue]): Either[NoSuchElementException, LocalDateTime] =
    values.get(key) match
      case Some(JsString(value)) => Right(DateUtils.parseLocalDateTime(value))
      case _ => Left(new NoSuchElementException(s"$key not found in the values map. Available keys: ${values.keys.mkString(", ")}"))

  /**
   * Reads an optional value of type LocalDateTime from the provided JSON object based on the specified key.
   *
   * @param key    The key used to retrieve the value from the JSON object.
   * @param values The JSON object containing the optional values.
   * @return An Option containing the extracted value of type LocalDateTime, or None if the value is not present.
   */
  override def readOption(key: String, values: Map[String, JsValue]): Option[LocalDateTime] =
    values.get(key).flatMap(value => scala.util.Try(DateUtils.parseLocalDateTime(value.convertTo[String])).toOption)
