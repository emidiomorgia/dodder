using Microsoft.EntityFrameworkCore.Migrations;

namespace Core.Infrastructure.Migrations
{
    public partial class Add_Email_on_User : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "EMail",
                table: "Users",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EMail",
                table: "Users");
        }
    }
}
