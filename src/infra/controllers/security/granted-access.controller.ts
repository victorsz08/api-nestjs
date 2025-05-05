import { Body, Controller, HttpCode, Param, Post } from "@nestjs/common";
import { Roles } from "src/domain/decorators/role.decorator";
import { Role } from "src/domain/enum/role.enum";
import { GrantedAccessValidator } from "src/infra/validators/security/granted-access.validator";
import { RecoveryAccessValidator } from "src/infra/validators/security/recovery-access.validator";
import { GrantedAccessUsecase } from "src/usecase/security/granted-access.usecase";


@Controller("securities/grantedaccess")
export class GrantedAccessController {
    constructor(private readonly grantedAccessUsecase: GrantedAccessUsecase) {};

    @Post(":userId")
    @HttpCode(204)
    @Roles(Role.ADMIN)
    async grantedAccess(@Param() params: RecoveryAccessValidator, @Body() body: GrantedAccessValidator) {
        const { userId } = params;
        const { role } = body;

        await this.grantedAccessUsecase.execute({ userId, role });
        return;
    };
};