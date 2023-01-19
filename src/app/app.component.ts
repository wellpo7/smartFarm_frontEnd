import { Component } from '@angular/core';
import { Device } from '@capacitor/device';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    this.handleDevice()
  }

  async handleDevice() {
    //Get code language 
    const code = await Device.getLanguageCode();
    console.log("Device code: ", code.value);
    localStorage.removeItem("codeLang");
    localStorage.setItem("codeLang", JSON.stringify(code.value));
    //Get device info 
    const deviceInfo = await Device.getInfo();
    console.log("Device info: ", deviceInfo);
    //Get device UUID 
    const deviceId = await Device.getId();
    console.log("Device id: ", deviceId);
  }

}
