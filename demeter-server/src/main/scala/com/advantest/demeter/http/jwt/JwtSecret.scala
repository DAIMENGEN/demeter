package com.advantest.demeter.http.jwt

import pdi.jwt.JwtAlgorithm

/**
 * Create on 2025/01/14
 * Author: mengen.dai@outlook.com
 */
type JwtAlgorithm = JwtAlgorithm.HS256.type
case class JwtSecret(
                      keyId: String,
                      issuer: String,
                      secret: String,
                      algorithm: JwtAlgorithm
                    )

