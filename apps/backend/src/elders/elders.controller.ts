import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { EldersService } from './elders.service';
import { CreateElderDto } from './dto/create-elder.dto';
import { UpdateElderDto } from './dto/update-elder.dto';
import { AssignCaregiversDto } from './dto/assign-caregivers.dto';
import { Elder } from './elder.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('elders')
@ApiBearerAuth()
@Controller('elders')
@UseGuards(JwtAuthGuard)
export class EldersController {
  constructor(private readonly eldersService: EldersService) {}

  @Post()
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Create a new elder (Admin only)' })
  @ApiResponse({ status: 201, description: 'Elder created successfully' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Admin access required',
  })
  create(@Body() createElderDto: CreateElderDto): Promise<Elder> {
    return this.eldersService.create(createElderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all elders' })
  @ApiResponse({ status: 200, description: 'List of elders retrieved' })
  findAll(): Promise<Elder[]> {
    return this.eldersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get elder by ID' })
  @ApiResponse({ status: 200, description: 'Elder retrieved' })
  @ApiResponse({ status: 404, description: 'Elder not found' })
  findOne(@Param('id') id: string): Promise<Elder> {
    return this.eldersService.findOne(id);
  }

  @Get('caregiver/:userId')
  @ApiOperation({ summary: 'Get elders assigned to a specific caregiver' })
  @ApiResponse({ status: 200, description: 'List of elders retrieved' })
  findByCaregiver(@Param('userId') userId: string): Promise<Elder[]> {
    return this.eldersService.findByCaregiver(userId);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  update(
    @Param('id') id: string,
    @Body() updateElderDto: UpdateElderDto,
  ): Promise<Elder> {
    return this.eldersService.update(id, updateElderDto);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.eldersService.remove(id);
  }

  @Post(':id/caregivers')
  @UseGuards(AdminGuard)
  assignCaregivers(
    @Param('id') id: string,
    @Body() assignCaregiversDto: AssignCaregiversDto,
  ): Promise<Elder> {
    return this.eldersService.assignCaregivers(id, assignCaregiversDto);
  }

  @Post(':elderId/caregivers/:userId')
  @UseGuards(AdminGuard)
  @HttpCode(HttpStatus.CREATED)
  addCaregiver(
    @Param('elderId') elderId: string,
    @Param('userId') userId: string,
  ): Promise<Elder> {
    return this.eldersService.addCaregiver(elderId, userId);
  }

  @Delete(':elderId/caregivers/:userId')
  @UseGuards(AdminGuard)
  @HttpCode(HttpStatus.OK)
  removeCaregiver(
    @Param('elderId') elderId: string,
    @Param('userId') userId: string,
  ): Promise<Elder> {
    return this.eldersService.removeCaregiver(elderId, userId);
  }
}
