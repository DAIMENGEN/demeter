package com.advantest.demeter.http.service

import com.advantest.demeter.DemeterSystem
import com.advantest.demeter.database.DBJdbcProfile.profile.api.*
import com.advantest.demeter.database.table.team.TeamDBTable
import com.advantest.demeter.http.HttpService
import com.advantest.demeter.http.payload.TeamPayload

import scala.concurrent.Future
import scala.language.implicitConversions

/**
 * Create on 2024/10/26
 * Author: mengen.dai@outlook.com
 */
case class TeamService()(using system: DemeterSystem, db: Database) extends HttpService(system):
  private val teamTable: TeamDBTable = TeamDBTable()

  def getAllTeams: Future[Seq[TeamPayload]] = teamTable.query().map(_.map(_.toEntity))

