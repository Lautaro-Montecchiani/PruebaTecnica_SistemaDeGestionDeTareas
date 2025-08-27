"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const auth_module_1 = require("./auth/auth.module");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const task_entity_1 = require("./entities/task.entity");
const category_entity_1 = require("./entities/category.entity");
const task_controller_1 = require("./controllers/task.controller");
const task_service_1 = require("./services/task.service");
const category_controller_1 = require("./controllers/category.controller");
const category_service_1 = require("./services/category.service");
const user_controller_1 = require("./controllers/user.controller");
const user_service_1 = require("./services/user.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DB_HOST || 'localhost',
                port: parseInt(process.env.DB_PORT || '5432', 10),
                username: process.env.DB_USER || 'postgres',
                password: process.env.DB_PASSWORD || 'postgres',
                database: process.env.DB_NAME || 'tasks',
                entities: [user_entity_1.User, task_entity_1.Task, category_entity_1.Category],
                synchronize: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, task_entity_1.Task, category_entity_1.Category]),
            auth_module_1.AuthModule,
        ],
        controllers: [task_controller_1.TaskController, category_controller_1.CategoryController, user_controller_1.UserController],
        providers: [task_service_1.TaskService, category_service_1.CategoryService, user_service_1.UserService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map