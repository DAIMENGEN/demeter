package com.advantest.demeter.database

import slick.jdbc.{JdbcProfile, MySQLProfile}

/**
 * Create on 2025/01/12
 * Author: mengen.dai@outlook.com
 */
case object DBJdbcProfile:
  val profile: JdbcProfile = MySQLProfile
