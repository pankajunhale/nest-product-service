import { Controller, Get, Res } from '@nestjs/common';
import { Public } from '../../common/decorators/public.decorator';

@Controller()
export class HealthController {

    @Public()
    @Get('health')
    async getHealth(@Res({ passthrough: true }) res): Promise<string> {
        return "Ok";
    }

}
