package com.advantest.demeter.dispatchers

import akka.actor.typed.DispatcherSelector
import com.advantest.demeter.DemeterSystem

import scala.concurrent.ExecutionContext

/**
 * Create on 2025/01/11
 * Author: mengen.dai@outlook.com
 */
case object ComputeIntensiveTaskDispatcher:
  def apply(system: DemeterSystem): ExecutionContext = system.dispatchers.lookup(DispatcherSelector.fromConfig("dispatcher.compute-intensive-task-dispatcher"))
