using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore; // Ensure this using directive is present
using Microsoft.IdentityModel.Tokens;
using WAH.BLL.DbSeeder;
using WAH.BLL.Interfaces;
using WAH.BLL.Services;
using WAH.BLL.Services.Implementations.AssetServices;
using WAH.BLL.Services.Implementations.AuthServices;
using WAH.BLL.Services.Interfaces;
using WAH.BLL.Services.Interfaces.AssetInterfaces;
using WAH.BLL.Services.Interfaces.AuthInterface;
using WAH.DAL.Data;
using WAH.DAL.EntityModels.AuthEntities;
using WAH.DAL.Repositories.Implementations;
using WAH.DAL.Repositories.Interfaces;


var builder = WebApplication.CreateBuilder(args);

// Database
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Repositories
builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));

// Services
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IJwtTokenService, JwtTokenService>();
builder.Services.AddScoped<IOtpService, OtpService>();
builder.Services.AddScoped<IAssetService, AssetService>();
builder.Services.AddScoped<IAssetRequestService, AssetRequestService>();
builder.Services.AddScoped<IAssetCategoryService, AssetCategoryService>();
builder.Services.AddScoped<IUserProfileService, UserProfileService>();
builder.Services.AddScoped<IGenericRepository<UserProfileEntity>, GenericRepository<UserProfileEntity>>();
builder.Services.AddScoped<IPasswordHasherService, PasswordHasherService>();
builder.Services.AddScoped<DatabaseSeeder>();

// Controllers & Swagger
builder.Services.AddControllers();
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.PropertyNamingPolicy = null;
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,

        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
            builder.Configuration["Jwt:Key"]))
    };
});

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies()); 
builder.Services.AddMemoryCache();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontendDev",
        policy =>
        {
            policy.AllowAnyOrigin() // frontend origin
                  .AllowAnyHeader()
                  .AllowAnyMethod();     
        });
});

var app = builder.Build();
// Seed Admin
using (var scope = app.Services.CreateScope())
{
    var seeder = scope.ServiceProvider.GetRequiredService<DatabaseSeeder>();
    seeder.SeedAdmin();
}

// Middleware pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowAngularApp");
app.UseCors("AllowFrontendDev");
app.UseCors("AllowFrontendDev");
app.UseHttpsRedirection();
app.UseRouting(); //AM Added

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
