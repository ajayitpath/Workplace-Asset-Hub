using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore; // Ensure this using directive is present
using WAH.DAL.Data;
using WAH.DAL.Repositories.Implementations;
using WAH.DAL.Repositories.Interfaces; // Ensure this using directive is present and correct

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();

// Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Fix for CS0305: Specify the generic type parameter explicitly
builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped<IPasswordHasher<object>, PasswordHasher<object>>();

var app = builder.Build();

// Middleware pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
