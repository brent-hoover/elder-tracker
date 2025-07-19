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
  Request,
  Query,
} from '@nestjs/common';
import { StatusUpdatesService } from './status-updates.service';
import { CreateStatusUpdateDto } from './dto/create-status-update.dto';
import { UpdateStatusUpdateDto } from './dto/update-status-update.dto';
import { FilterStatusUpdateDto } from './dto/filter-status-update.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { StatusUpdate } from './status-update.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('status-updates')
@ApiBearerAuth()
@Controller('status-updates')
@UseGuards(JwtAuthGuard)
export class StatusUpdatesController {
  constructor(private readonly statusUpdatesService: StatusUpdatesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new status update' })
  @ApiResponse({
    status: 201,
    description: 'Status update created successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(
    @Body() createStatusUpdateDto: CreateStatusUpdateDto,
    @Request() req: Express.Request & { user: { userId: string } },
  ): Promise<StatusUpdate> {
    return this.statusUpdatesService.create(
      createStatusUpdateDto,
      req.user.userId,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all status updates with optional filters' })
  @ApiResponse({ status: 200, description: 'List of status updates retrieved' })
  findAll(@Query() filters: FilterStatusUpdateDto): Promise<StatusUpdate[]> {
    return this.statusUpdatesService.findAll(filters);
  }

  @Get('elder/:elderId')
  @ApiOperation({ summary: 'Get status updates for a specific elder' })
  @ApiResponse({ status: 200, description: 'List of status updates retrieved' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Not a caregiver for this elder',
  })
  findByElder(
    @Param('elderId') elderId: string,
    @Request() req: Express.Request & { user: { userId: string } },
  ): Promise<StatusUpdate[]> {
    return this.statusUpdatesService.findByElder(elderId, req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get status update by ID' })
  @ApiResponse({ status: 200, description: 'Status update retrieved' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Not a caregiver for this elder',
  })
  @ApiResponse({ status: 404, description: 'Status update not found' })
  findOne(
    @Param('id') id: string,
    @Request() req: Express.Request & { user: { userId: string } },
  ): Promise<StatusUpdate> {
    return this.statusUpdatesService.findOne(id, req.user.userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStatusUpdateDto: UpdateStatusUpdateDto,
    @Request() req: Express.Request & { user: { userId: string } },
  ): Promise<StatusUpdate> {
    return this.statusUpdatesService.update(
      id,
      updateStatusUpdateDto,
      req.user.userId,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('id') id: string,
    @Request() req: Express.Request & { user: { userId: string } },
  ): Promise<void> {
    return this.statusUpdatesService.remove(id, req.user.userId);
  }
}
