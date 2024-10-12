import { Module } from '@nestjs/common'

import { XmlParserService } from './xml-parser.service'

@Module({
  providers: [XmlParserService],
  exports: [XmlParserService]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class XmlParserModule {}
