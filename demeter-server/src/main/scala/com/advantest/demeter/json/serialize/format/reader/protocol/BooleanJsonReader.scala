package com.advantest.demeter.json.serialize.format.reader.protocol

import com.advantest.demeter.json.serialize.format.reader.JsonReader
import spray.json.DefaultJsonProtocol.BooleanJsonFormat
import spray.json.JsValue

/**
 * Create on 2024/10/13
 * Author: mengen.dai@outlook.com
 *
 * BooleanJsonReader: A JsonReader implementation for reading Boolean value from JSON object.
 */
object BooleanJsonReader extends JsonReader[Boolean]:
  /**
   * Reads a value of type Boolean from the provided JSON object based on the specified key.
   *
   * @param key    The key used to retrieve the value from the JSON object.
   * @param values The JSON object containing the values.
   * @return Either a DemeterException if an error occurs during extraction, or the extracted value of type Boolean.
   */
  override def read(key: String, values: Map[String, JsValue]): Either[NoSuchElementException, Boolean] =
    values.get(key) match
      case Some(value) => Right(value.convertTo[Boolean])
      case None => Left(new NoSuchElementException(s"$key not found in the values map. Available keys: ${values.keys.mkString(", ")}"))

  /**
   * Reads an optional value of type Boolean from the provided JSON object based on the specified key.
   *
   * @param key    The key used to retrieve the value from the JSON object.
   * @param values The JSON object containing the optional values.
   * @return An Option containing the extracted value of type Boolean, or None if the value is not present.
   */
  override def readOption(key: String, values: Map[String, JsValue]): Option[Boolean] =
    values.get(key).flatMap(value => scala.util.Try(value.convertTo[Boolean]).toOption)
