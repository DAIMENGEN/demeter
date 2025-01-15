package com.advantest.demeter.json.serialize.format.reader.protocol

import com.advantest.demeter.json.serialize.format.reader.JsonReader
import spray.json.DefaultJsonProtocol.{StringJsonFormat, immSeqFormat}
import spray.json.JsValue

import scala.util.Try

/**
 * Create on 2024/10/13
 * Author: mengen.dai@outlook.com
 *
 * LongArrayJsonReader: A JsonReader implementation for reading Seq[Long] value from JSON object.
 */
object LongArrayJsonReader extends JsonReader[Seq[Long]]:
  /**
   * Reads a value of type Seq[Long] from the provided JSON object based on the specified key.
   *
   * @param key    The key used to retrieve the value from the JSON object.
   * @param values The JSON object containing the values.
   * @return Either a DemeterException if an error occurs during extraction, or the extracted value of type Seq[Long].
   */
  override def read(key: String, values: Map[String, JsValue]): Either[NoSuchElementException, Seq[Long]] =
    values.get(key) match
      case Some(value) => Right(value.convertTo[Seq[String]].map(_.toLong))
      case None => Left(new NoSuchElementException(s"$key not found in the values map. Available keys: ${values.keys.mkString(", ")}"))

  /**
   * Reads an optional value of type Seq[Long] from the provided JSON object based on the specified key.
   *
   * @param key    The key used to retrieve the value from the JSON object.
   * @param values The JSON object containing the optional values.
   * @return An Option containing the extracted value of type Seq[Long], or None if the value is not present.
   */
  override def readOption(key: String, values: Map[String, JsValue]): Option[Seq[Long]] =
    values.get(key).flatMap(value => Try(value.convertTo[Seq[String]].map(_.toLong)).toOption)
