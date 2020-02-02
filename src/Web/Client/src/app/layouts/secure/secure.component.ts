import { Component, OnInit } from '@angular/core';
import { SecureService } from './secure.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})
export class SecureComponent implements OnInit {
    private secureService: SecureService;
    router: Router;

    constructor(secureService : SecureService, router : Router) {
        this.secureService = secureService;
        this.router = router;
    }

    ngOnInit() {

        var treeviewMenu = $('.app-menu');

        // Toggle Sidebar
        $('[data-toggle="sidebar"]').click(function (event) {
        event.preventDefault();
        $('.app').toggleClass('sidenav-toggled');
        });

        // Activate sidebar treeview toggle
        $("[data-toggle='treeview']").click(function (event) {
        event.preventDefault();
        if (!$(this).parent().hasClass('is-expanded')) {
            treeviewMenu.find("[data-toggle='treeview']").parent().removeClass('is-expanded');
        }
        $(this).parent().toggleClass('is-expanded');
        });

        // Set initial active toggle
        $("[data-toggle='treeview.'].is-expanded").parent().toggleClass('is-expanded');
    }

    public logoutClicked() {

        this.secureService.emptyAuthKey();
        this.router.navigate(['login']);
    }

}
