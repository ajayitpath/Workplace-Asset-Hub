using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore; // Ensure this using directive is present
using Microsoft.IdentityModel.Tokens;
using WAH.BLL.DbSeeder;
<<<<<<< HEAD
=======
using WAH.BLL.Interfaces;
using WAH.BLL.Services;
using WAH.BLL.Services.Implementations.AssetServices;
>>>>>>> 37460a2419a2b4497bc5880090c561747cc63d26
using WAH.BLL.Services.Implementations.AuthServices;
using WAH.BLL.Services.Interfaces.AuthInterface;
using WAH.DAL.Data;
using WAH.DAL.EntityModels.AuthEntities;
using WAH.DAL.Repositories.Implementations;
using WAH.DAL.Repositories.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Database
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
    {
        policy.WithOrigins("http://localhost:4200")  // Angular dev server
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.PropertyNamingPolicy = null;
});
// Repositories
builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));

// Services
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IJwtTokenService, JwtTokenService>();
builder.Services.AddScoped<IOtpService, OtpService>();
<<<<<<< HEAD

=======
builder.Services.AddScoped<IAssetService, AssetService>();
builder.Services.AddScoped<IAssetRequestService, AssetRequestService>();
>>>>>>> 37460a2419a2b4497bc5880090c561747cc63d26

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


// Fix for CS0305: Specify the generic type parameter explicitly
builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped<IPasswordHasherService, PasswordHasherService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IUserProfileService, UserProfileService>();
builder.Services.AddScoped<IGenericRepository<UserProfileEntity>, GenericRepository<UserProfileEntity>>();


//Add for email service - otp stored in cache
builder.Services.AddMemoryCache();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontendDev",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173") // frontend origin
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials(); // If using cookies/auth headers
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
<<<<<<< HEAD

app.UseCors("AllowAngularApp");
=======
app.UseCors("AllowFrontendDev");

>>>>>>> 37460a2419a2b4497bc5880090c561747cc63d26
app.UseHttpsRedirection();
app.UseRouting(); //AM Added

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
