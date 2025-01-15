package com.advantest.demeter.database

import java.time.LocalDateTime

/**
 * Create on 2025/01/03
 * Author: mengen.dai@outlook.com
 */
trait DBConverters:

  given Conversion[Long, DBLongValue] with
    def apply(value: Long): DBLongValue = DBLongValue(value)

  given Conversion[Seq[Long], Seq[DBLongValue]] with
    def apply(values: Seq[Long]): Seq[DBLongValue] = values.map(DBLongValue(_))

  given Conversion[String, DBVarcharValue] with
    def apply(value: String): DBVarcharValue = DBVarcharValue(value)

  given Conversion[LocalDateTime, DBDateTimeValue] with
    def apply(value: LocalDateTime): DBDateTimeValue = DBDateTimeValue(value)

