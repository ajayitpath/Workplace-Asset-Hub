using System.Security.Cryptography;
using WAH.BLL.Services.Interfaces.AuthInterface;

public class PasswordHasherService : IPasswordHasherService
{
    private const int SaltSize = 16; 
    private const int KeySize = 32;   
    private const int Iterations = 10000;

    public string HashPassword(string password)
    {
        using var algorithm = new Rfc2898DeriveBytes(
            password,
            SaltSize,
            Iterations,
            HashAlgorithmName.SHA256);

        var key = algorithm.GetBytes(KeySize);
        var salt = algorithm.Salt;
        return $"{Iterations}.{Convert.ToBase64String(salt)}.{Convert.ToBase64String(key)}";
    }

    public bool VerifyPassword(string hashedPassword, string providedPassword)
    {
        var parts = hashedPassword.Split('.', 3);
        if (parts.Length != 3)
            return false;

        int iterations = int.Parse(parts[0]);
        byte[] salt = Convert.FromBase64String(parts[1]);
        byte[] key = Convert.FromBase64String(parts[2]);

        using var algorithm = new Rfc2898DeriveBytes(
            providedPassword,
            salt,
            iterations,
            HashAlgorithmName.SHA256);

        byte[] keyToCheck = algorithm.GetBytes(KeySize);

        return CryptographicOperations.FixedTimeEquals(keyToCheck, key);
    }
}
