// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateArtCodiciDto } from './create-art-codici.dto';

export class UpdateArtCodiciDto extends PartialType(CreateArtCodiciDto) {}
