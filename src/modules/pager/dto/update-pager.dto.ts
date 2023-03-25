import { PartialType } from '@nestjs/mapped-types';
import { CreatePagerDto } from './create-pager.dto';

export class UpdatePagerDto extends PartialType(CreatePagerDto) {}
