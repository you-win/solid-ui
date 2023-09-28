import { exec } from "child_process"
import { readFile } from "fs"

import { log, spinner } from "@clack/prompts"

export function readJsonFile(
  filePath: string,
  callback: (error: Error | null, data: unknown | null) => void
): void {
  readFile(filePath, "utf8", (err, data) => {
    if (err) {
      callback(err, null)
      return
    }

    try {
      const jsonObject = JSON.parse(data)
      callback(null, jsonObject)
    } catch (parseError) {
      callback(parseError as Error, null)
    }
  })
}

export async function runCommand(command: string, message?: string, endMessage?: string) {
  const indicator = spinner()
  indicator.start(message)

  exec(command, (error, stdout) => {
    if (!message) log.info(stdout)

    if (error) log.error(`Something went wrong while running the command: ${error}`)
  })

  if (endMessage) indicator.stop(endMessage)
}

export function removeExtension(value: string) {
  const splitWords = value.split(".")

  return splitWords[0]
}
