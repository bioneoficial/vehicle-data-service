import type { Entity } from 'typeorm'

import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { DataSource, ObjectLiteral, Repository } from 'typeorm'

@Injectable()
export class GeneralClassValidatorService {
  repositoriesMap: Record<string, Repository<ObjectLiteral>> = {}

  constructor(dataSource: DataSource) {
    for (const entity of dataSource.entityMetadatas) {
      if (!entity.targetName) {
        continue
      }

      const name = entity.targetName.toLowerCase()

      this.repositoriesMap[name] = dataSource.getRepository(entity.target)
    }
  }

  findOne(id: number, entity: string): Promise<ObjectLiteral[]> | undefined {
    const repo = this.repositoriesMap[entity]

    return repo?.find({ where: { id } })
  }

  async validateExists(id: number, entity: string): Promise<typeof Entity | null | unknown> {
    const repo = this.repositoriesMap[entity]
    const object = await repo?.findOne({ where: { id: id } })

    if (!object) {
      throw new HttpException({ message: 'parent_id inválido' }, HttpStatus.BAD_REQUEST)
    }

    return object
  }

  async checkExist(id: number, entity: string): Promise<boolean> {
    try {
      await this.validateExists(id, entity)

      return true
    } catch (error) {
      if (error instanceof HttpException && error.message === 'parent_id inválido') {
        return false
      }

      throw error
    }
  }
}
