import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RequestWithUser } from 'src/auth/interfaces/request-with-user.interface';

@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Post(':questionId')
  @UseGuards(AuthGuard)
  create(
    @Body() createAnswerDto: CreateAnswerDto,
    @Request() req: RequestWithUser,
    @Param('questionId') questionId: string,
  ) {
    console.log('Fazendo o debug NOVAMENTE: ', req.user.sub);
    return this.answersService.create(
      createAnswerDto,
      req.user.sub,
      Number(questionId),
    );
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.answersService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.answersService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answersService.update(+id, updateAnswerDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.answersService.remove(+id);
  }
}
