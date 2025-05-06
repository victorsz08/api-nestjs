import { Controller, HttpCode, Param, Post } from "@nestjs/common";
import { Roles } from "src/domain/decorators/role.decorator";
import { Role } from "src/domain/enum/role.enum";
import { RecoveryAccessValidator } from "src/infra/validators/security/recovery-access.validator";
import { RecoveryAccessUsecase } from "src/usecase/security/recovery-access.usecase";



@Controller("securities/recoveryaccess")
export class RecoveryAccessController {
    constructor(private readonly recoveryAccessUsecase: RecoveryAccessUsecase) {};

    @Post(":userId")
    @HttpCode(200)
    @Roles(Role.ADMIN)
    async recoveryAccess(@Param() params: RecoveryAccessValidator) {
        const response = await this.recoveryAccessUsecase.execute(params);

        return response;
    };
};