import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Data, Params } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css'],
})
export class ServerComponent implements OnInit {
  server: { id: number; name: string; status: string };

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      this.server = data['server'];
    });
    // const id = Number(this.route.snapshot.params['id']);
    // this.server = this.serversService.getServer(id);
    // //console.log(this.route.snapshot.url[1].path);
    // this.route.params.subscribe((params: Params) => {
    //   this.server = this.serversService.getServer(Number(params['id']));
    // });
  }
}
