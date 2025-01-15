package com.advantest.demeter.http

import com.advantest.demeter.DemeterSystem
import com.advantest.demeter.database.DBConverters
import com.advantest.demeter.dispatchers.IoIntensiveTaskDispatcher
import org.slf4j.Logger

import scala.concurrent.ExecutionContext

/**
 * Create on 2024/10/13
 * Author: mengen.dai@outlook.com
 */
trait HttpService(system: DemeterSystem) extends DBConverters:
  protected val logger: Logger = system.log

  protected given executionContext: ExecutionContext = IoIntensiveTaskDispatcher(system)
