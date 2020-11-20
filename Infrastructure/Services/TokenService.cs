using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Core.Entities.Identity;
using Core.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Infrastructure.Services
{
  public class TokenService : ITokenService
  {
    private readonly IConfiguration _config;
    private readonly SymmetricSecurityKey _key;

    public TokenService(IConfiguration config)
    {
      _config = config;

      var tokenKey = _config["Token:Key"];
      var encodedKey = Encoding.UTF8.GetBytes(tokenKey);
      _key = new SymmetricSecurityKey(encodedKey);
    }

    public string CreateToken(AppUser user)
    {
      var claims = new List<Claim> {
          new Claim(JwtRegisteredClaimNames.Email, user.Email),
          new Claim(JwtRegisteredClaimNames.GivenName, user.DisplayName),
      };

      var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);
      var issuerToken = _config["Token:Issuer"];
      var tokenDescriptor = new SecurityTokenDescriptor {
          Subject = new ClaimsIdentity(claims),
          Expires = DateTime.Now.AddDays(7),
          SigningCredentials = creds,
          Issuer = issuerToken,
      };

      var tokenHandler = new JwtSecurityTokenHandler();
      var token = tokenHandler.CreateToken(tokenDescriptor);

      return tokenHandler.WriteToken(token);
    }
  }
}