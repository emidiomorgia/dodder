using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations
{
    public partial class WorkSpace__User_Relations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "WorkSpaces",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkSpaces", x => x.ID);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_WorkSpaceId",
                table: "Users",
                column: "WorkSpaceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_WorkSpaces_WorkSpaceId",
                table: "Users",
                column: "WorkSpaceId",
                principalTable: "WorkSpaces",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_WorkSpaces_WorkSpaceId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "WorkSpaces");

            migrationBuilder.DropIndex(
                name: "IX_Users_WorkSpaceId",
                table: "Users");
        }
    }
}
