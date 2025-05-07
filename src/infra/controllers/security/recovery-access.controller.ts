import { Controller, HttpCode, Param, Post } from "@nestjs/common";
import { Roles } from "../../../domain/decorators/role.decorator";
import { Role } from "../../../domain/enum/role.enum";
import { RecoveryAccessValidator } from "../../../infra/validators/security/recovery-access.validator";
import { RecoveryAccessUsecase } from "../../../usecase/security/recovery-access.usecase";



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