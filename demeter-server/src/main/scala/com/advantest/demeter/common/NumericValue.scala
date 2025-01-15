package com.advantest.demeter.common

import com.advantest.demeter.json.serialize.Serializable
import spray.json.*
import spray.json.DefaultJsonProtocol.*

/**
 * Create on 2024/11/9
 * Author: mengen.dai@outlook.com
 */
sealed trait NumericValue

final case class IntNumericValue(value: Int) extends NumericValue

final case class LongNumericValue(value: Long) extends NumericValue

final case class FloatNumericValue(value: Float) extends NumericValue

final case class DoubleNumericValue(value: Double) extends NumericValue

object NumericValue extends Serializable[NumericValue]:
  override given serializeFormat: RootJsonFormat[NumericValue] = new RootJsonFormat[NumericValue]:
    override def write(obj: NumericValue): JsValue = obj match
      case IntNumericValue(value) => value.toJson
      case LongNumericValue(value) => value.toJson
      case FloatNumericValue(value) => value.toJson
      case DoubleNumericValue(value) => value.toJson

    override def read(json: JsValue): NumericValue = throw new UnsupportedOperationException("Reading NumericValue from JSON is not supported.")