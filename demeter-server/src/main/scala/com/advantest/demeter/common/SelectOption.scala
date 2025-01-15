package com.advantest.demeter.common

import com.advantest.demeter.json.serialize.Serializable
import spray.json.DefaultJsonProtocol.*
import spray.json.RootJsonFormat

/**
 * Create on 2024/11/9
 * Author: mengen.dai@outlook.com
 */
sealed trait SelectOption

final case class SelectNumericOption(label: String, value: NumericValue) extends SelectOption

object SelectNumericOption extends Serializable[SelectNumericOption]:
  override given serializeFormat: RootJsonFormat[SelectNumericOption] = jsonFormat2(SelectNumericOption.apply)
