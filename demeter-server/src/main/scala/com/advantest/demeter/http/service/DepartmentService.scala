package com.advantest.demeter.http.service

import com.advantest.demeter.DemeterSystem
import com.advantest.demeter.database.DBJdbcProfile.profile.api.*
import com.advantest.demeter.database.table.department.DepartmentDBTable
import com.advantest.demeter.http.HttpService
import com.advantest.demeter.http.payload.DepartmentPayload

import scala.concurrent.Future
import scala.language.implicitConversions

/**
 * Create on 2024/10/26
 * Author: mengen.dai@outlook.com
 */
case class DepartmentService()(using system: DemeterSystem, db: Database) extends HttpService(system):
  private val departmentTable: DepartmentDBTable = DepartmentDBTable()

  def getAllDepartments: Future[Seq[DepartmentPayload]] = departmentTable.query().map(_.map(_.toEntity))
