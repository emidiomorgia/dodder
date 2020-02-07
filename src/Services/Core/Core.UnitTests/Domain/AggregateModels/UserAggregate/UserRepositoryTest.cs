using Core.Domain.AggregateModels.UserAggregate;
using Core.Infrastructure;
using Core.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace Core.UnitTests.Domain.AggregateModels.UserAggregate
{
    public class UserRepositoryTest
    {
        [Fact]
        public async void GetByIdAsync__should_return_entity_when_exists() 
        {
            var options = new DbContextOptionsBuilder<DodderContext>()
                .UseInMemoryDatabase(databaseName: "GetByIdAsync__should_return_entity_when_exists")
                .Options;

            // Insert seed data into the database using one instance of the context 
            using (var context = new DodderContext(options))
            {
                context.Users.Add(new User(1,"a","b"));
                context.Users.Add(new User(2, "a1", "b1"));
                context.SaveChanges();
            }

            // Use a clean instance of the context to run the test
            using (var context = new DodderContext(options))
            {
                var repo = new UserRepository(context);
                var result = await repo.GetByIdAsync(1);
                Assert.NotNull(result);
            }
        }

        [Fact]
        public async void GetByIdAsync__should_return_null_when_not_exists()
        {
            var options = new DbContextOptionsBuilder<DodderContext>()
                .UseInMemoryDatabase(databaseName: "GetByIdAsync__should_return_null_when_not_exists")
                .Options;

            // Insert seed data into the database using one instance of the context
            using (var context = new DodderContext(options))
            {
                context.Users.Add(new User(1, "a", "b"));
                context.Users.Add(new User(2, "a1", "b1"));
                context.SaveChanges();
            }

            // Use a clean instance of the context to run the test
            using (var context = new DodderContext(options))
            {
                var repo = new UserRepository(context);
                var result = await repo.GetByIdAsync(3);
                Assert.Null(result);
            }
        }

        [Fact]
        public async void GetByUsernameAndPasswordAsync__should_return_entity_when_exists()
        {
            var options = new DbContextOptionsBuilder<DodderContext>()
                .UseInMemoryDatabase(databaseName: "GetByUsernameAndPasswordAsync__should_return_entity_when_exists")
                .Options;

            // Insert seed data into the database using one instance of the context
            using (var context = new DodderContext(options))
            {
                context.Users.Add(new User(1, "a", "b"));
                context.Users.Add(new User(2, "a1", "b1"));
                context.SaveChanges();
            }

            // Use a clean instance of the context to run the test
            using (var context = new DodderContext(options))
            {
                var repo = new UserRepository(context);
                var result = await repo.GetByUsernameAndPasswordAsync("a","b");
                Assert.NotNull(result);
            }
        }

        [Fact]
        public async void GetByUsernameAndPasswordAsync__should_return_null_when_not_exists()
        {
            var options = new DbContextOptionsBuilder<DodderContext>()
                .UseInMemoryDatabase(databaseName: "GetByUsernameAndPasswordAsync__should_return_null_when_not_exists")
                .Options;

            // Insert seed data into the database using one instance of the context
            using (var context = new DodderContext(options))
            {
                context.Users.Add(new User(1, "a", "b2"));
                context.Users.Add(new User(2, "a1", "b1"));
                context.SaveChanges();
            }

            // Use a clean instance of the context to run the test
            using (var context = new DodderContext(options))
            {
                var repo = new UserRepository(context);
                var result = await repo.GetByUsernameAndPasswordAsync("a3", "b3");
                Assert.Null(result);
            }
        }
    }
}
