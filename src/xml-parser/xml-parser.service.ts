import { Injectable } from '@nestjs/common'
import { parseStringPromise } from 'xml2js'

@Injectable()
export class XmlParserService {
  async parseXml(xmlData: string): Promise<unknown> {
    try {
      return await parseStringPromise(xmlData, { explicitArray: false })
    } catch (error) {
      throw new Error('Error parsing XML data: ' + error)
    }
  }
}
