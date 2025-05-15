// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateCfDto } from './create-cf.dto';

export class UpdateCfDto extends PartialType(CreateCfDto) {}
